package org.chimple.firebasesync.database;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;


import org.chimple.firebasesync.model.School;

import java.util.List;

import static androidx.room.OnConflictStrategy.REPLACE;

@Dao
public interface SchoolDao {
    @Query("SELECT * FROM SCHOOL where firebaseId = :firebaseId")
    List<School> loadAllSchools(String firebaseId);

    @Insert(onConflict = REPLACE)
    void insertSchool(School school);

    @Delete
    void delete(School school);

    @Query("delete from SCHOOL where firebaseId = :firebaseId")
    void deleteById(String firebaseId);


    @Query("SELECT COUNT(firebaseId) FROM SCHOOL WHERE firebaseId = :firebaseId LIMIT 1")
    Integer countSchoolById(String firebaseId);

    @Query("SELECT * FROM SCHOOL WHERE firebaseId = :firebaseId LIMIT 1")
    School loadSchoolById(String firebaseId);

    @Query("SELECT * FROM SCHOOL WHERE firebaseId = :firebaseId LIMIT 1")
    School findSchoolById(String firebaseId);

}
