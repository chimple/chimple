package org.chimple.firebasesync.database;

import androidx.room.Dao;
import androidx.room.Delete;
import androidx.room.Insert;
import androidx.room.Query;


import org.chimple.firebasesync.model.Section;

import java.util.List;

import static androidx.room.OnConflictStrategy.REPLACE;

@Dao
public interface SectionDao {
    @Query("SELECT * FROM SECTION where schoolId = :schoolId")
    List<Section> loadAllSectionsBySchoolId(String schoolId);

    @Insert(onConflict = REPLACE)
    void insertSection(Section Section);

    @Delete
    void delete(Section Section);

    @Query("delete from SECTION where firebaseId = :firebaseId")
    void deleteById(String firebaseId);

    @Query("SELECT COUNT(firebaseId) FROM Section WHERE firebaseId = :firebaseId LIMIT 1")
    Integer countSectionById(String firebaseId);

    @Query("SELECT * FROM Section WHERE firebaseId = :firebaseId LIMIT 1")
    Section loadSectionById(String firebaseId);

}
