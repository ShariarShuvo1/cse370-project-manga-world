package com.amakakeru.mangaworld.Repository;

import com.amakakeru.mangaworld.Entity.Chapter;
import com.amakakeru.mangaworld.Entity.MangaFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MangaFileRepository extends JpaRepository<MangaFile, Long> {

    //    @Query("SELECT m FROM MangaFile m WHERE m.chapter = ?1")
    MangaFile findMangaFileByChapter(Chapter chapter);
}
