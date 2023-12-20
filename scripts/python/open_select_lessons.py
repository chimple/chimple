"""Script to open select lessons for all students in the school
Given a firestore school doc id, script will fetch all sections and all students
For each student, it will open the lessons in the map lessons_to_open
"""

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

lessons_to_open = {
    "en": ["ambulance","anchor","auto","bag","ball","balloon","balloon1","balloon10","balloon11","balloon12","balloon13","balloon14","balloon15","balloon16","balloon17","balloon18","balloon19","balloon2","balloon20","balloon21","balloon22","balloon23","balloon24","balloon25","balloon26","balloon27","balloon28","balloon29","balloon3","balloon30","balloon31","balloon32","balloon33","balloon34","balloon35","balloon36","balloon37","balloon38","balloon39","balloon4","balloon40","balloon41","balloon42","balloon43","balloon44","balloon45","balloon46","balloon47","balloon48","balloon49","balloon5","balloon50","balloon51","balloon52","balloon53","balloon54","balloon55","balloon56","balloon57","balloon58","balloon59","balloon6","balloon60","balloon61","balloon62","balloon63","balloon64","balloon65","balloon66","balloon67","balloon68","balloon69","balloon7","balloon70","balloon71","balloon72","balloon73","balloon74","balloon75","balloon76","balloon76","balloon77","balloon78","balloon79","balloon8","balloon80","balloon81","balloon82","balloon83","balloon84","balloon85","balloon86","balloon87","balloon88","balloon9","bell","pram"],
    "kn": ["kn0004","kn0104","kn0204","kn0304","kn0404","kn0504","kn0604","kn0608","kn0704","kn0804","kn0904","kn1004","kn1102","kn1304","kn1604","kn1804","kn1808","kn2004","kn2008","kn2204","kn2208","kn2404","kn2408","kn2504","kn2604","kn2704","kn2708","kn2804","kn2904","kn3004","kn3204","kn3404","kn3704","kn3709","kn3804","kn4004","kn4104","kn4204","kn4208","kn4304","kn4404","kn4504","kn4604","kn4608","kn4704","kn4708","kn4712","kn4716"],
    "maths": ["challenge1","challenge10","challenge11","challenge12","challenge13","challenge14","challenge15","challenge16","challenge17","challenge18","challenge19","challenge20","challenge21","challenge22","challenge23","challenge24","challenge25","challenge26","challenge27","challenge28","challenge29","challenge30","challenge31","challenge32","challenge33","challenge34","challenge35","challenge36","challenge37","challenge38","challenge39","challenge40","challenge41","challenge42","challenge43","challenge44","challenge45","challenge46","challenge47","challenge48","challenge49","challenge5","challenge50","challenge51","challenge52","challenge53","challenge54","challenge55","challenge56","challenge57","challenge58","challenge59","challenge6","challenge60","challenge61","challenge62","challenge63","challenge64","challenge65","challenge66","challenge67","challenge68","challenge69","challenge7","challenge70","challenge71","challenge72","challenge73","challenge74","challenge75","challenge76","challenge77","challenge78","challenge79","challenge8","challenge80","challenge81","challenge82","challenge83","challenge84","challenge85","challenge86","challenge87","challenge88","challenge89","challenge9","challenge90"]
}

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
            
            if('lessonProgressMap' in fb_profile):
                lesson_progress_map = fb_profile['lessonProgressMap']
            else:
                lesson_progress_map = {}
                fb_profile['lessonProgressMap'] = lesson_progress_map
            for course in lessons_to_open:
                for lesson in lessons_to_open[course]:
                    if lesson not in lesson_progress_map:
                        lesson_progress_map[lesson] = {
                            "achievement": 0,
                            "assignmentIds": [],
                            "attempts": 1,
                            "course": course,
                            "date": "2023-08-01T08:49:40.252Z",
                            "score": 1
                        }
            student_ref.update({
                'profile': fb_profile
            })
            print('Updated profile: ' + student.id)

# students_ref.update({
#     'profile': profile})

