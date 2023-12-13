package com.amakakeru.mangaworld.Controller;

import com.amakakeru.mangaworld.Entity.Chapter;
import com.amakakeru.mangaworld.Entity.MangaFile;
import com.amakakeru.mangaworld.Repository.MangaFileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class MangaFileController {

    @Autowired
    private MangaFileRepository mangaFileRepository;

    @PostMapping("/mangaFile/findMangaFileByChapter")
    public MangaFile findMangaFileByChapter(@RequestBody Chapter chapter) {
        return mangaFileRepository.findMangaFileByChapter(chapter);
    }
}
