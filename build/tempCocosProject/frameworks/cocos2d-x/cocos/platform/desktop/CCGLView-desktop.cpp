/****************************************************************************
Copyright (c) 2010-2012 cocos2d-x.org
Copyright (c) 2013-2016 Chukong Technologies Inc.
Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

http://www.cocos2d-x.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
****************************************************************************/

#include "platform/desktop/CCGLView-desktop.h"
#include "scripting/js-bindings/event/EventDispatcher.h"
#include "cocos/scripting/js-bindings/jswrapper/SeApi.h"
#include "base/ccMacros.h"
#include "base/ccUtils.h"
#include "platform/CCApplication.h"
#include "cocos/ui/edit-box/EditBox.h"

#include <cmath>
#include <unordered_map>

NS_CC_BEGIN

GLView* GLFWEventHandler::_view = nullptr;

namespace
{
    struct RGBA
    {
        int r = 0;
        int g = 0;
        int b = 0;
        int a = 0;
    };
    
    struct DepthInfo
    {
        int depth = 0;
        int stencil = 0;
    };

    struct RGBA pixelformat2RGBA(Application::PixelFormat pixelformat)
    {
        struct RGBA ret;
        if (Application::PixelFormat::RGBA8 == pixelformat)
            ret.r = ret.g = ret.b = ret. a = 8;
            
        if (Application::PixelFormat::RGB565 == pixelformat)
        {
            ret.r = 5;
            ret.g = 6;
            ret.b = 5;
        }
        
        if (Application::PixelFormat::RGB8 == pixelformat)
            ret.r = ret.g = ret.b = 8;
            
        return ret;
    }
    
    struct DepthInfo depthformat2DepthInfo(Application::DepthFormat depthFormat)
    {
        struct DepthInfo ret;
        switch (depthFormat)
        {
            case Application::DepthFormat::NONE:
                break;
            case Application::DepthFormat::DEPTH_COMPONENT16:
                ret.depth = 16;
                break;
            case Application::DepthFormat::DEPTH_COMPONENT24:
                ret.depth = 24;
                break;
            case Application::DepthFormat::DEPTH_COMPONENT32F:
                ret.depth = 32;
                break;
            case Application::DepthFormat::DEPTH24_STENCIL8:
                ret.depth = 24;
                ret.stencil = 8;
                break;
            case Application::DepthFormat::DEPTH32F_STENCIL8:
                ret.depth = 32;
                ret.stencil = 8;
                break;
            case Application::DepthFormat::STENCIL_INDEX8:
                ret.stencil = 8;
                break;
            default:
                break;
        }
        
        return ret;
    }
}


//////////////////////////////////////////////////////////////////////////
// implement GLView
//////////////////////////////////////////////////////////////////////////

GLView::GLView(Application* application, const std::string& name, int x, int y, int width, int height,
               Application::PixelFormat pixelformat, Application::DepthFormat depthFormat, int multisamplingCount)
: _application(application)
, _mainWindow(nullptr)
, _monitor(nullptr)
, _mouseX(0.0f)
, _mouseY(0.0f)
{
    GLFWEventHandler::setGLView(this);
    glfwSetErrorCallback(GLFWEventHandler::onGLFWError);
    glfwInit();
    
    struct RGBA rgba = pixelformat2RGBA(pixelformat);
    struct DepthInfo depthInfo = depthformat2DepthInfo(depthFormat);

    glfwWindowHint(GLFW_RED_BITS, rgba.r);
    glfwWindowHint(GLFW_GREEN_BITS, rgba.g);
    glfwWindowHint(GLFW_BLUE_BITS, rgba.b);
    glfwWindowHint(GLFW_ALPHA_BITS, rgba.a);
    glfwWindowHint(GLFW_DEPTH_BITS, depthInfo.depth);
    glfwWindowHint(GLFW_STENCIL_BITS, depthInfo.stencil);
    glfwWindowHint(GLFW_SAMPLES, multisamplingCount);
    _mainWindow = glfwCreateWindow(width, height, name.c_str(), _monitor, nullptr);

    if (_mainWindow == nullptr)
    {
        std::string message = "Can't create window";
        if (!_glfwError.empty())
        {
            message.append("\nMore info: \n");
            message.append(_glfwError);
        }
        printf("%s\n", message.c_str());
        return;
    }

    glfwMakeContextCurrent(_mainWindow);

    glfwSetMouseButtonCallback(_mainWindow, GLFWEventHandler::onGLFWMouseCallBack);
    glfwSetCursorPosCallback(_mainWindow, GLFWEventHandler::onGLFWMouseMoveCallBack);
    glfwSetScrollCallback(_mainWindow, GLFWEventHandler::onGLFWMouseScrollCallback);
    glfwSetCharCallback(_mainWindow, GLFWEventHandler::onGLFWCharCallback);
    glfwSetKeyCallback(_mainWindow, GLFWEventHandler::onGLFWKeyCallback);
    glfwSetWindowIconifyCallback(_mainWindow, GLFWEventHandler::onGLFWWindowIconifyCallback);
    glfwSetWindowSizeCallback(_mainWindow, GLFWEventHandler::onGLFWWindowSizeFunCallback);

    // check OpenGL version at first
    const GLubyte* glVersion = glGetString(GL_VERSION);

    if (utils::atof((const char*)glVersion) < 1.5 )
    {
        char strComplain[256] = {0};
        sprintf(strComplain,
                "OpenGL 1.5 or higher is required (your version is %s). Please upgrade the driver of your video card.",
                glVersion);
        printf("%s\n", strComplain);
        return;
    }

    initGlew();

    // Enable point size by default.
    glEnable(GL_VERTEX_PROGRAM_POINT_SIZE);
    
    if(multisamplingCount > 0)
        glEnable(GL_MULTISAMPLE);
    
    computeScale();
    
    glGetIntegerv(GL_FRAMEBUFFER_BINDING, &_mainFBO);
    Application::getInstance()->updateViewSize(width * _scale, height * _scale);
}

GLView::~GLView()
{
    GLFWEventHandler::setGLView(nullptr);
    glfwTerminate();
}

bool GLView::windowShouldClose() const
{
    if(_mainWindow)
        return glfwWindowShouldClose(_mainWindow) ? true : false;
    else
        return true;
}

void GLView::pollEvents()
{
    glfwPollEvents();
}

void GLView::swapBuffers()
{
    glfwSwapBuffers(_mainWindow);
}

float GLView::getScale() const
{
    return _scale;
}

GLint GLView::getMainFBO() const
{
    return _mainFBO;
}

void GLView::setIsEditboxEditing(bool value)
{
    _isEditboxEditing = value;
}

void GLView::onGLFWError(int errorID, const char* errorDesc)
{
    if (_mainWindow)
        printf("GLFWError #%d Happen, %s\n", errorID, errorDesc);
    else
        printf("GLFWError #%d Happen, %s\n", errorID, errorDesc);
}

namespace
{
    void dispatchMouseEvent(double x, double y, unsigned short button, cocos2d::MouseEvent::Type type)
    {
        cocos2d::MouseEvent mouseEvent;
        mouseEvent.x = x;
        mouseEvent.y = y;
        mouseEvent.button = button;
        mouseEvent.type = type;
        cocos2d::EventDispatcher::dispatchMouseEvent(mouseEvent);
    }
}

void GLView::onGLFWMouseCallBack(GLFWwindow* /*window*/, int button, int action, int /*modify*/)
{
    if (_isEditboxEditing)
        EditBox::complete();
    
    unsigned short jsButton;
    if (GLFW_MOUSE_BUTTON_LEFT == button)
        jsButton = 0;
    else if (GLFW_MOUSE_BUTTON_MIDDLE == button)
        jsButton = 1;
    else if (GLFW_MOUSE_BUTTON_RIGHT == button)
        jsButton = 2;

    if (GLFW_PRESS == action)
    {
        dispatchMouseEvent(_mouseX, _mouseY, jsButton, MouseEvent::Type::DOWN);
    }
    else if (GLFW_RELEASE == action)
    {
        dispatchMouseEvent(_mouseX, _mouseY, jsButton, MouseEvent::Type::UP);
    }
}

void GLView::onGLFWMouseScrollCallback(GLFWwindow* window, double x, double y)
{
    if (_isEditboxEditing)
        return;
    
    dispatchMouseEvent(x, y, 0, MouseEvent::Type::WHEEL);
}

void GLView::onGLFWMouseMoveCallBack(GLFWwindow* window, double x, double y)
{
    _mouseX = (float)x;
    _mouseY = (float)y;
    
    if (_isEditboxEditing)
        return;

    dispatchMouseEvent(_mouseX, _mouseY, 0, MouseEvent::Type::MOVE);
}

void GLView::onGLFWKeyCallback(GLFWwindow* /*window*/, int key, int /*scancode*/, int action, int mods)
{
//    printf("key: %d, action: %d, mods: %d\n", key, action, mods);
    int keyInWeb = -1;
    if (key >= GLFW_KEY_0 && key <= GLFW_KEY_9)
        keyInWeb = key;
    else if (key >= GLFW_KEY_A && key <= GLFW_KEY_Z)
        keyInWeb = key;
    else if (key >= GLFW_KEY_F1 && key <= GLFW_KEY_F12)
        keyInWeb = key - 178;
    else if (key >= GLFW_KEY_KP_0 && key <= GLFW_KEY_KP_9)
        keyInWeb = key - 272 + 10000; // For indicating number in Numberpad, needs to be converted in JS.
    else if (key == GLFW_KEY_ESCAPE)
        keyInWeb = 27;
    else if (key == GLFW_KEY_MINUS)
        keyInWeb = 189;
    else if (key == GLFW_KEY_EQUAL)
        keyInWeb = 187;
    else if (key == GLFW_KEY_BACKSLASH)
        keyInWeb = 220;
    else if (key == GLFW_KEY_GRAVE_ACCENT)
        keyInWeb = 192;
    else if (key == GLFW_KEY_BACKSPACE)
        keyInWeb = 8;
    else if (key == GLFW_KEY_ENTER)
        keyInWeb = 13;
    else if (key == GLFW_KEY_LEFT_BRACKET)
        keyInWeb = 219;
    else if (key == GLFW_KEY_RIGHT_BRACKET)
        keyInWeb = 221;
    else if (key == GLFW_KEY_SEMICOLON)
        keyInWeb = 186;
    else if (key == GLFW_KEY_APOSTROPHE)
        keyInWeb = 222;
    else if (key == GLFW_KEY_TAB)
        keyInWeb = 9;
    else if (key == GLFW_KEY_LEFT_CONTROL)
        keyInWeb = 17;
    else if (key == GLFW_KEY_RIGHT_CONTROL)
        keyInWeb = 17 + 20000; // For indicating Left/Right control, needs to be converted in JS.
    else if (key == GLFW_KEY_LEFT_SHIFT)
        keyInWeb = 16;
    else if (key == GLFW_KEY_RIGHT_SHIFT)
        keyInWeb = 16 + 20000; // For indicating Left/Right shift, needs to be converted in JS.
    else if (key == GLFW_KEY_LEFT_ALT)
        keyInWeb = 18;
    else if (key == GLFW_KEY_RIGHT_ALT)
        keyInWeb = 18 + 20000; // For indicating Left/Right alt, needs to be converted in JS.
    else if (key == GLFW_KEY_LEFT_SUPER)
        keyInWeb = 91;
    else if (key == GLFW_KEY_RIGHT_SUPER)
        keyInWeb = 93;
    else if (key == GLFW_KEY_UP)
        keyInWeb = 38;
    else if (key == GLFW_KEY_DOWN)
        keyInWeb = 40;
    else if (key == GLFW_KEY_LEFT)
        keyInWeb = 37;
    else if (key == GLFW_KEY_RIGHT)
        keyInWeb = 39;
    else if (key == GLFW_KEY_MENU)
        keyInWeb = 93 + 20000;
    else if (key == GLFW_KEY_KP_ENTER)
        keyInWeb = 13 + 20000; // For indicating numpad enter, needs to be converted in JS.
    else if (key == GLFW_KEY_KP_ADD)
        keyInWeb = 107;
    else if (key == GLFW_KEY_KP_SUBTRACT)
        keyInWeb = 109;
    else if (key == GLFW_KEY_KP_MULTIPLY)
        keyInWeb = 106;
    else if (key == GLFW_KEY_KP_DIVIDE)
        keyInWeb = 111;
    else if (key == GLFW_KEY_NUM_LOCK)
        keyInWeb = 12;
    else if (key == GLFW_KEY_F13)
        keyInWeb = 124;
    else if (key == GLFW_KEY_BACKSPACE)
        keyInWeb = 8;
    else if (key == GLFW_KEY_HOME)
        keyInWeb = 36;
    else if (key == GLFW_KEY_PAGE_UP)
        keyInWeb = 33;
    else if (key == GLFW_KEY_PAGE_DOWN)
        keyInWeb = 34;
    else if (key == GLFW_KEY_END)
        keyInWeb = 35;
    else if (key == GLFW_KEY_COMMA)
        keyInWeb = 188;
    else if (key == GLFW_KEY_PERIOD)
        keyInWeb = 190;
    else if (key == GLFW_KEY_SLASH)
        keyInWeb = 191;
    else if (key == GLFW_KEY_SPACE)
        keyInWeb = 32;
    else if (key == GLFW_KEY_DELETE)
        keyInWeb = 46;
    else if (key == GLFW_KEY_KP_DECIMAL)
        keyInWeb = 110;
    else if (key == GLFW_KEY_CAPS_LOCK)
        keyInWeb = 20;

    KeyboardEvent event;
    event.key = keyInWeb;
    if (action == GLFW_PRESS)
        event.action = KeyboardEvent::Action::PRESS;
    else if (action == GLFW_RELEASE)
        event.action = KeyboardEvent::Action::RELEASE;
    else if (action == GLFW_REPEAT)
        event.action = KeyboardEvent::Action::REPEAT;

    if (mods & GLFW_MOD_SHIFT)
        event.shiftKeyActive = true;
    if (mods & GLFW_MOD_CONTROL)
        event.ctrlKeyActive = true;
    if (mods & GLFW_MOD_ALT)
        event.altKeyActive = true;
    if (mods & GLFW_MOD_SUPER)
        event.metaKeyActive = true;

    EventDispatcher::dispatchKeyboardEvent(event);
}

void GLView::onGLFWCharCallback(GLFWwindow* /*window*/, unsigned int character)
{
    // REFINE
    // char16_t wcharString[2] = { (char16_t) character, 0 };
    // std::string utf8String;

    // StringUtils::UTF16ToUTF8( wcharString, utf8String );
    // static std::set<std::string> controlUnicode = {
    //     "\xEF\x9C\x80", // up
    //     "\xEF\x9C\x81", // down
    //     "\xEF\x9C\x82", // left
    //     "\xEF\x9C\x83", // right
    //     "\xEF\x9C\xA8", // delete
    //     "\xEF\x9C\xA9", // home
    //     "\xEF\x9C\xAB", // end
    //     "\xEF\x9C\xAC", // pageup
    //     "\xEF\x9C\xAD", // pagedown
    //     "\xEF\x9C\xB9"  // clear
    // };
}

void GLView::onGLFWWindowIconifyCallback(GLFWwindow* /*window*/, int iconified)
{
    if (iconified == GL_TRUE)
        _application->onPause();
    else
        _application->onResume();
}

void GLView::onGLFWWindowSizeFunCallback(GLFWwindow *window, int width, int height)
{
    int targetWidth = width * _scale, targetHeight = height * _scale;
    Application::getInstance()->updateViewSize(targetWidth, targetHeight);
    EventDispatcher::dispatchResizeEvent(targetWidth, targetHeight);
}

#if (CC_TARGET_PLATFORM == CC_PLATFORM_WIN32)
static bool glew_dynamic_binding()
{
    const char *gl_extensions = (const char*)glGetString(GL_EXTENSIONS);

    // If the current opengl driver doesn't have framebuffers methods, check if an extension exists
    if (glGenFramebuffers == nullptr)
    {
        log("OpenGL: glGenFramebuffers is nullptr, try to detect an extension");
        if (strstr(gl_extensions, "ARB_framebuffer_object"))
        {
            log("OpenGL: ARB_framebuffer_object is supported");

            glIsRenderbuffer = (PFNGLISRENDERBUFFERPROC) wglGetProcAddress("glIsRenderbuffer");
            glBindRenderbuffer = (PFNGLBINDRENDERBUFFERPROC) wglGetProcAddress("glBindRenderbuffer");
            glDeleteRenderbuffers = (PFNGLDELETERENDERBUFFERSPROC) wglGetProcAddress("glDeleteRenderbuffers");
            glGenRenderbuffers = (PFNGLGENRENDERBUFFERSPROC) wglGetProcAddress("glGenRenderbuffers");
            glRenderbufferStorage = (PFNGLRENDERBUFFERSTORAGEPROC) wglGetProcAddress("glRenderbufferStorage");
            glGetRenderbufferParameteriv = (PFNGLGETRENDERBUFFERPARAMETERIVPROC) wglGetProcAddress("glGetRenderbufferParameteriv");
            glIsFramebuffer = (PFNGLISFRAMEBUFFERPROC) wglGetProcAddress("glIsFramebuffer");
            glBindFramebuffer = (PFNGLBINDFRAMEBUFFERPROC) wglGetProcAddress("glBindFramebuffer");
            glDeleteFramebuffers = (PFNGLDELETEFRAMEBUFFERSPROC) wglGetProcAddress("glDeleteFramebuffers");
            glGenFramebuffers = (PFNGLGENFRAMEBUFFERSPROC) wglGetProcAddress("glGenFramebuffers");
            glCheckFramebufferStatus = (PFNGLCHECKFRAMEBUFFERSTATUSPROC) wglGetProcAddress("glCheckFramebufferStatus");
            glFramebufferTexture1D = (PFNGLFRAMEBUFFERTEXTURE1DPROC) wglGetProcAddress("glFramebufferTexture1D");
            glFramebufferTexture2D = (PFNGLFRAMEBUFFERTEXTURE2DPROC) wglGetProcAddress("glFramebufferTexture2D");
            glFramebufferTexture3D = (PFNGLFRAMEBUFFERTEXTURE3DPROC) wglGetProcAddress("glFramebufferTexture3D");
            glFramebufferRenderbuffer = (PFNGLFRAMEBUFFERRENDERBUFFERPROC) wglGetProcAddress("glFramebufferRenderbuffer");
            glGetFramebufferAttachmentParameteriv = (PFNGLGETFRAMEBUFFERATTACHMENTPARAMETERIVPROC) wglGetProcAddress("glGetFramebufferAttachmentParameteriv");
            glGenerateMipmap = (PFNGLGENERATEMIPMAPPROC) wglGetProcAddress("glGenerateMipmap");
        }
        else
        if (strstr(gl_extensions, "EXT_framebuffer_object"))
        {
            log("OpenGL: EXT_framebuffer_object is supported");
            glIsRenderbuffer = (PFNGLISRENDERBUFFERPROC) wglGetProcAddress("glIsRenderbufferEXT");
            glBindRenderbuffer = (PFNGLBINDRENDERBUFFERPROC) wglGetProcAddress("glBindRenderbufferEXT");
            glDeleteRenderbuffers = (PFNGLDELETERENDERBUFFERSPROC) wglGetProcAddress("glDeleteRenderbuffersEXT");
            glGenRenderbuffers = (PFNGLGENRENDERBUFFERSPROC) wglGetProcAddress("glGenRenderbuffersEXT");
            glRenderbufferStorage = (PFNGLRENDERBUFFERSTORAGEPROC) wglGetProcAddress("glRenderbufferStorageEXT");
            glGetRenderbufferParameteriv = (PFNGLGETRENDERBUFFERPARAMETERIVPROC) wglGetProcAddress("glGetRenderbufferParameterivEXT");
            glIsFramebuffer = (PFNGLISFRAMEBUFFERPROC) wglGetProcAddress("glIsFramebufferEXT");
            glBindFramebuffer = (PFNGLBINDFRAMEBUFFERPROC) wglGetProcAddress("glBindFramebufferEXT");
            glDeleteFramebuffers = (PFNGLDELETEFRAMEBUFFERSPROC) wglGetProcAddress("glDeleteFramebuffersEXT");
            glGenFramebuffers = (PFNGLGENFRAMEBUFFERSPROC) wglGetProcAddress("glGenFramebuffersEXT");
            glCheckFramebufferStatus = (PFNGLCHECKFRAMEBUFFERSTATUSPROC) wglGetProcAddress("glCheckFramebufferStatusEXT");
            glFramebufferTexture1D = (PFNGLFRAMEBUFFERTEXTURE1DPROC) wglGetProcAddress("glFramebufferTexture1DEXT");
            glFramebufferTexture2D = (PFNGLFRAMEBUFFERTEXTURE2DPROC) wglGetProcAddress("glFramebufferTexture2DEXT");
            glFramebufferTexture3D = (PFNGLFRAMEBUFFERTEXTURE3DPROC) wglGetProcAddress("glFramebufferTexture3DEXT");
            glFramebufferRenderbuffer = (PFNGLFRAMEBUFFERRENDERBUFFERPROC) wglGetProcAddress("glFramebufferRenderbufferEXT");
            glGetFramebufferAttachmentParameteriv = (PFNGLGETFRAMEBUFFERATTACHMENTPARAMETERIVPROC) wglGetProcAddress("glGetFramebufferAttachmentParameterivEXT");
            glGenerateMipmap = (PFNGLGENERATEMIPMAPPROC) wglGetProcAddress("glGenerateMipmapEXT");
        }
        else
        {
            log("OpenGL: No framebuffers extension is supported");
            log("OpenGL: Any call to Fbo will crash!");
            return false;
        }
    }
    return true;
}
#endif

void GLView::computeScale()
{
    int widthInPixel = 0;
    glfwGetFramebufferSize(_mainWindow, &widthInPixel, nullptr);
    
    int width = 0;
    glfwGetWindowSize(_mainWindow, &width, nullptr);
    
    _scale = float(widthInPixel) / width;
}

// helper
bool GLView::initGlew()
{
#if (CC_TARGET_PLATFORM != CC_PLATFORM_MAC)
    GLenum GlewInitResult = glewInit();
    if (GLEW_OK != GlewInitResult)
    {
        log((char *)glewGetErrorString(GlewInitResult), "OpenGL error");
        return false;
    }

    if (GLEW_ARB_vertex_shader && GLEW_ARB_fragment_shader)
    {
        log("Ready for GLSL");
    }
    else
    {
        log("Not totally ready :(");
    }

    if (glewIsSupported("GL_VERSION_2_0"))
    {
        log("Ready for OpenGL 2.0");
    }
    else
    {
        log("OpenGL 2.0 not supported");
    }

#if (CC_TARGET_PLATFORM == CC_PLATFORM_WIN32)
    if(glew_dynamic_binding() == false)
    {
        log("No OpenGL framebuffer support. Please upgrade the driver of your video card.", "OpenGL error");
        return false;
    }
#endif

#endif // (CC_TARGET_PLATFORM != CC_PLATFORM_MAC)

    return true;
}

NS_CC_END // end of namespace cocos2d;
