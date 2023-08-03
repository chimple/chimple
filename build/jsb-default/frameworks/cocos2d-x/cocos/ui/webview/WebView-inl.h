/****************************************************************************
 Copyright (c) 2014-2016 Chukong Technologies Inc.
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

#include "WebView.h"
#include "platform/CCFileUtils.h"
#include "platform/CCPlatformConfig.h"

#if CC_TARGET_PLATFORM == CC_PLATFORM_IOS && !defined(CC_PLATFORM_OS_TVOS)
#include "WebViewImpl-ios.h"
#elif CC_TARGET_PLATFORM == CC_PLATFORM_ANDROID
#include "WebViewImpl-android.h"
#else
static_assert(false, "WebView only supported on iOS & Android");
#endif

NS_CC_BEGIN

    WebView::WebView()
            : _impl(new WebViewImpl(this)),
              _onJSCallback(nullptr),
              _onShouldStartLoading(nullptr),
              _onDidFinishLoading(nullptr),
              _onDidFailLoading(nullptr) {
    }

    WebView::~WebView() {
        CC_SAFE_DELETE(_impl);
    }

    WebView *WebView::create() {
        auto webView = new(std::nothrow) WebView();
        if (webView) {
            webView->autorelease();
            return webView;
        }
        CC_SAFE_DELETE(webView);
        return nullptr;
    }

    void WebView::setJavascriptInterfaceScheme(const std::string &scheme) {
        _impl->setJavascriptInterfaceScheme(scheme);
    }

    void WebView::loadData(const cocos2d::Data &data,
                           const std::string &MIMEType,
                           const std::string &encoding,
                           const std::string &baseURL) {
        _impl->loadData(data, MIMEType, encoding, baseURL);
    }

    void WebView::loadHTMLString(const std::string &string, const std::string &baseURL) {
        _impl->loadHTMLString(string, baseURL);
    }

    void WebView::loadURL(const std::string &url) {
        _impl->loadURL(url);
    }

    void WebView::loadFile(const std::string &fileName) {
        _impl->loadFile(fileName);
    }

    void WebView::stopLoading() {
        _impl->stopLoading();
    }

    void WebView::reload() {
        _impl->reload();
    }

    bool WebView::canGoBack() {
        return _impl->canGoBack();
    }

    bool WebView::canGoForward() {
        return _impl->canGoForward();
    }

    void WebView::goBack() {
        _impl->goBack();
    }

    void WebView::goForward() {
        _impl->goForward();
    }

    void WebView::evaluateJS(const std::string &js) {
        _impl->evaluateJS(js);
    }

    void WebView::setScalesPageToFit(bool const scalesPageToFit) {
        _impl->setScalesPageToFit(scalesPageToFit);
    }

    void WebView::setVisible(bool visible) {
        _impl->setVisible(visible);
    }

    void WebView::setFrame(float x, float y, float width, float height) {
        _impl->setFrame(x, y, width, height);
    }

    void WebView::setBounces(bool bounces) {
        _impl->setBounces(bounces);
    }

    void WebView::setBackgroundTransparent(bool isTransparent) {
        _impl->setBackgroundTransparent(isTransparent);
    }

    void WebView::setOnDidFailLoading(const ccWebViewCallback &callback) {
        _onDidFailLoading = callback;
    }

    void WebView::setOnDidFinishLoading(const ccWebViewCallback &callback) {
        _onDidFinishLoading = callback;
    }

    void WebView::setOnShouldStartLoading(
            const std::function<bool(WebView *sender, const std::string &url)> &callback) {
        _onShouldStartLoading = callback;
    }

    void WebView::setOnJSCallback(const ccWebViewCallback &callback) {
        _onJSCallback = callback;
    }

    std::function<bool(WebView
                       *sender,
                       const std::string &url
    )>

    WebView::getOnShouldStartLoading() const {
        return _onShouldStartLoading;
    }

    WebView::ccWebViewCallback WebView::getOnDidFailLoading() const {
        return _onDidFailLoading;
    }

    WebView::ccWebViewCallback WebView::getOnDidFinishLoading() const {
        return _onDidFinishLoading;
    }

    WebView::ccWebViewCallback WebView::getOnJSCallback() const {
        return _onJSCallback;
    }

} //namespace cocos2d

/// @endcond
