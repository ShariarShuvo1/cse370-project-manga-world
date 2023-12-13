package com.amakakeru.mangaworld.Repository;

import com.amakakeru.mangaworld.Entity.Chapter;
import com.amakakeru.mangaworld.Entity.ChapterCover;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000")
@Repository
public interface ChapterCoverRepository extends JpaRepository<ChapterCover, Long> {

    //    @Query("SELECT c FROM ChapterCover c WHERE c.chapter = ?1")
    ChapterCover findChapterCoverByChapter(Chapter chapter);
}
