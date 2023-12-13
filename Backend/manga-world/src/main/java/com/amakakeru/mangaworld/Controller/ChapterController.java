package com.amakakeru.mangaworld.Controller;


import com.amakakeru.mangaworld.Entity.Chapter;
import com.amakakeru.mangaworld.Entity.ChapterCover;
import com.amakakeru.mangaworld.Entity.MangaFile;
import com.amakakeru.mangaworld.Entity.Volume;
import com.amakakeru.mangaworld.Repository.ChapterCoverRepository;
import com.amakakeru.mangaworld.Repository.ChapterRepository;
import com.amakakeru.mangaworld.Repository.MangaFileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ChapterController {

    @Autowired
    private ChapterRepository chapterRepository;

    @Autowired
    private ChapterCoverRepository chapterCoverRepository;

    @Autowired
    private MangaFileRepository mangaFileRepository;

    @PostMapping("/chapters/findAllByVolume")
    private List<Chapter> findAllByVolume(@RequestBody Volume volume) {
        return chapterRepository.findAllByVolume(volume);
    }

    @PostMapping("/chapters/findChapterPicture")
    private ChapterCover findChapterPicture(@RequestBody Chapter chapter) {
        return chapterCoverRepository.findChapterCoverByChapter(chapter);
    }

    @PostMapping("/chapters/addNewChapter")
    private Chapter addNewChapter(@RequestBody Chapter chapter) {
        return chapterRepository.save(chapter);
    }

    @PostMapping("/chapters/addChapterCover")
    private ChapterCover addChapterCover(@RequestBody ChapterCover chapterCover) {
        return chapterCoverRepository.save(chapterCover);
    }

    @PostMapping("/chapters/addChapterPdf")
    private MangaFile addChapterPdf(@RequestBody MangaFile mangaFile) {
        return mangaFileRepository.save(mangaFile);
    }

    @PostMapping("/chapters/viewIncrement")
    public void viewIncrement(@RequestBody Chapter chapter) {
        Optional<Chapter> chapter1 = chapterRepository.findById(chapter.getCid());
        if (chapter1.isPresent()) {
            chapter1.get().setCview(chapter1.get().getCview() + 1);
            chapterRepository.save(chapter1.get());
        }
    }
}
