package org.chimple.firebasesync.model;

import androidx.annotation.NonNull;
import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.Ignore;
import androidx.room.PrimaryKey;

import com.google.firebase.firestore.DocumentReference;

import java.util.Objects;

@Entity(tableName = "SECTION")
public class Section {

    @NonNull
    @PrimaryKey
    private String firebaseId;

    @ColumnInfo(name = "image")
    private String image;

    @ColumnInfo(name = "name")
    private String name;

    @ColumnInfo(name = "schoolId")
    private String schoolId;

    @Ignore
    private DocumentReference school;

    public Section() {
    }

    public Section(String firebaseId, String schoolId, String image, String name, DocumentReference school) {
        this.firebaseId = firebaseId;
        this.image = image;
        this.name = name;
        this.school = school;
        this.schoolId = schoolId;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public DocumentReference getSchool() {
        return school;
    }

    public void setSchool(DocumentReference school) {
        this.school = school;
    }

    public void setFirebaseId(String firebaseId) {
        this.firebaseId = firebaseId;
    }

    public String getFirebaseId() {
        return this.firebaseId;
    }

    public String getSchoolId() {
        return schoolId;
    }

    public void setSchoolId(String schoolId) {
        this.schoolId = schoolId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Section section = (Section) o;
        return firebaseId.equals(section.firebaseId) &&
                Objects.equals(image, section.image) &&
                Objects.equals(name, section.name) &&
                schoolId.equals(section.schoolId) &&
                Objects.equals(school, section.school);
    }

    @Override
    public int hashCode() {
        return Objects.hash(firebaseId, image, name, schoolId, school);
    }

    @Override
    public String toString() {
        return "Section{" +
                "firebaseId='" + firebaseId + '\'' +
                ", image='" + image + '\'' +
                ", name='" + name + '\'' +
                ", schoolId='" + schoolId + '\'' +
                ", school=" + school +
                '}';
    }
}
