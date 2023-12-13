package com.amakakeru.mangaworld.Controller;

import com.amakakeru.mangaworld.Entity.AuthorManga;
import com.amakakeru.mangaworld.Entity.Manga;
import com.amakakeru.mangaworld.Repository.AuthorMangaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
public class AuthorMangaController {

    @Autowired
    private AuthorMangaRepository authorMangaRepository;

    @PostMapping("/authorMangas/getAuthorMangaByManga")
    public List<AuthorManga> getAuthorMangaByManga(@RequestBody Manga manga) {
        return authorMangaRepository.findAllByManga(manga);
    }

    @PostMapping("/authorMangas/addAuthorManga")
    public AuthorManga addAuthorManga(@RequestBody AuthorManga authorManga) {
        return authorMangaRepository.save(authorManga);
    }
}
