package org.chimple.bahama.model;

import androidx.annotation.NonNull;
import androidx.room.ColumnInfo;
import androidx.room.Entity;
import androidx.room.Ignore;
import androidx.room.PrimaryKey;

import java.util.List;
import java.util.Objects;

@Entity(tableName = "SCHOOL")
public class School {
    //We Must have an empty constructor for Firestore
    public School() {
    }

    public School(String firebaseId, String image, String name, boolean open, List<String> subjects) {
        this.image = image;
        this.firebaseId = firebaseId;
        this.name = name;
        this.open = open;
        this.subjects = subjects;
    }

    @ColumnInfo(name = "image")
    private String image;

    @ColumnInfo(name = "name")
    private String name;

    @ColumnInfo(name = "open")
    private boolean open;

    @NonNull
    @PrimaryKey
    private String firebaseId;

    @Ignore
    List<String> subjects;

    public String getFirebaseId() {
        return firebaseId;
    }

    public void setFirebaseId(String firebaseId) {
        this.firebaseId = firebaseId;
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

    public boolean isOpen() {
        return open;
    }

    public void setOpen(boolean open) {
        this.open = open;
    }

    public List<String> getSubjects() {
        return subjects;
    }

    public void setSubjects(List<String> subjects) {
        this.subjects = subjects;
    }

    @Override
    public String toString() {
        return "School{" +
                ", image='" + image + '\'' +
                ", name='" + name + '\'' +
                ", open=" + open +
                ", firebaseId='" + firebaseId + '\'' +
                ", subjects=" + subjects +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        School school = (School) o;
        return open == school.open &&
                Objects.equals(image, school.image) &&
                Objects.equals(name, school.name) &&
                firebaseId.equals(school.firebaseId) &&
                Objects.equals(subjects, school.subjects);
    }

    @Override
    public int hashCode() {
        return Objects.hash(image, name, open, firebaseId, subjects);
    }
}
