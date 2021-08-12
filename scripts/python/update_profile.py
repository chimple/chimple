import firebase_admin
from firebase_admin import credentials, firestore
import argparse
import json
import uuid

parser = argparse.ArgumentParser()
parser.add_argument("id", help="School Id")
args = parser.parse_args()
# IaxwnrKpYRG0VnzyQ7rY

cred = credentials.Certificate("./serviceAccountKey.json")
app = firebase_admin.initialize_app(cred)

with open('profile.json') as profile_json:
	profile = json.load(profile_json)

store = firestore.client()
school = store.collection(u'School').document(args.id).get()
sections = store.collection(u'School').document(args.id).collection(u'Section').get()
for section in sections:
    students = store.collection(u'School').document(args.id).collection(u'Section').document(section.id).collection('Student').get()
    for student in students:
        student_ref = store.collection(u'School').document(args.id).collection(u'Section').document(section.id).collection('Student').document(student.id)
        student_dict = student.to_dict()
        if 'profile' in student_dict:
            fb_profile = student_dict['profile']
            for course_name, course_val in fb_profile['courseProgressMap'].items():
                if course_name != 'puzzle':
                    course_val['currentChapterId'] = course_name + '00'
                    course_val['lessonPlan'] = []
            student_ref.update({
                'profile': fb_profile
            })
            print('Updated profile: ' + student.id)
        else:
            profile['id'] = str(uuid.uuid4())
            profile['name'] = student_dict['name']
            profile['age'] = student_dict['age']
            if student_dict['gender'] == 'male':
                profile['gender'] = 0
            else:
                profile['gender'] = 1
            profile['studentId'] = student.id
            profile['schoolId'] = school.id
            profile['schoolName'] = school.to_dict()['name']
            profile['sectionId'] = section.id
            profile['sectionName'] = section.to_dict()['name']
            student_ref.update({
                'profile': profile
            })
            print('Added profile: ' + student.id)


# students_ref.update({
#     'profile': profile})

