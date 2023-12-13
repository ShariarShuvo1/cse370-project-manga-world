package com.amakakeru.mangaworld.Controller;

import com.amakakeru.mangaworld.Entity.Manga;
import com.amakakeru.mangaworld.Entity.PublisherManga;
import com.amakakeru.mangaworld.Repository.PublisherMangaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://localhost:3000")
@RestController
public class PublisherMangaController {

    @Autowired
    private PublisherMangaRepository publisherMangaRepository;

    @PostMapping("/publisherMangas/getPublisherMangaByManga")
    public PublisherManga getPublisherMangaByManga(@RequestBody Manga manga) {
        return publisherMangaRepository.findAllByManga(manga);
    }

    @PostMapping("/publisherMangas/addPublisherManga")
    public PublisherManga addPublisherManga(@RequestBody PublisherManga publisherManga) {
        return publisherMangaRepository.save(publisherManga);
    }
}
