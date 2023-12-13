package com.amakakeru.mangaworld.Controller;

import com.amakakeru.mangaworld.Entity.Manga;
import com.amakakeru.mangaworld.Entity.MangaPicture;
import com.amakakeru.mangaworld.Repository.MangaPictureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class MangaPictureController {

    @Autowired
    private MangaPictureRepository mangaPictureRepository;

    @PostMapping("/mangaPictures/getByManga")
    public MangaPicture getMangaPictureByMangaId(@RequestBody Manga manga) {
        return mangaPictureRepository.findMangaPictureByManga(manga);
    }

    @PostMapping("/mangaPictures/addNewPicture")
    public MangaPicture addNewPicture(@RequestBody MangaPicture mangaPicture) {
        return mangaPictureRepository.save(mangaPicture);
    }
}
