package com.amakakeru.mangaworld.Repository;

import com.amakakeru.mangaworld.Entity.Chapter;
import com.amakakeru.mangaworld.Entity.Volume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@Repository
public interface ChapterRepository extends JpaRepository<Chapter, Long> {
    //    @Query("SELECT c FROM Chapter c WHERE c.chapterName = ?1")
    List<Chapter> findAllByVolume(Volume volume);
}
