package com.amakakeru.mangaworld.Controller;


import com.amakakeru.mangaworld.Entity.Author;
import com.amakakeru.mangaworld.Entity.AuthorManga;
import com.amakakeru.mangaworld.Entity.AuthorPicture;
import com.amakakeru.mangaworld.Entity.Manga;
import com.amakakeru.mangaworld.Repository.AuthorMangaRepository;
import com.amakakeru.mangaworld.Repository.AuthorPictureRepository;
import com.amakakeru.mangaworld.Repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
public class AuthorController {
    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private AuthorMangaRepository authorMangaRepository;

    @Autowired
    private AuthorPictureRepository authorPictureRepository;

    @GetMapping("/authors/getAllAuthors")
    public List<Author> getAllAuthors() {
        return authorRepository.findAll();
    }

    @PostMapping("/authors/getAuthorMangaCount")
    public Integer getAuthorMangaCount(@RequestBody Author author) {
        List<AuthorManga> authorMangas = authorMangaRepository.findAllByAuthor(author);
        return authorMangas.size();
    }

    @PostMapping("/authors/getAllAuthorManga/{pageNumber}")
    public List<Manga> getAllAuthorManga(@PathVariable String pageNumber, @RequestBody Author author) {
        Pageable pageable = PageRequest.of(Integer.parseInt(pageNumber), 15);
        List<AuthorManga> authorMangas = authorMangaRepository.findAuthorMangasByAuthor(author, pageable);
        List<Manga> mangas = new ArrayList<>();
        for (AuthorManga authorManga : authorMangas) {
            mangas.add(authorManga.getManga());
        }
        return mangas;
    }

    @PostMapping("/authors/findAuthorPictureByAuthor")
    public AuthorPicture findAuthorPictureByAuthor(@RequestBody Author author) {
        return authorPictureRepository.findAuthorPictureByAuthor(author);
    }

    @PostMapping("/authors/addNewAuthor")
    public Author addNewAuthor(@RequestBody Author author) {
        System.out.println(author.getAname());
        return authorRepository.save(author);
    }

    @PostMapping("/authors/addAuthorPicture")
    public AuthorPicture addAuthorPicture(@RequestBody AuthorPicture authorPicture) {
        return authorPictureRepository.save(authorPicture);
    }
}
