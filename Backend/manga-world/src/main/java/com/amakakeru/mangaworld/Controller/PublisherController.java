package com.amakakeru.mangaworld.Controller;

import com.amakakeru.mangaworld.Entity.Manga;
import com.amakakeru.mangaworld.Entity.Publisher;
import com.amakakeru.mangaworld.Entity.PublisherManga;
import com.amakakeru.mangaworld.Entity.PublisherPicture;
import com.amakakeru.mangaworld.Repository.PublisherMangaRepository;
import com.amakakeru.mangaworld.Repository.PublisherPictureRepository;
import com.amakakeru.mangaworld.Repository.PublisherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
public class PublisherController {

    @Autowired
    private PublisherRepository publisherRepository;

    @Autowired
    private PublisherPictureRepository publisherPictureRepository;

    @Autowired
    private PublisherMangaRepository publisherMangaRepository;

    @PostMapping("/publishers/findPublisherPictureByPublisher")
    public PublisherPicture findPublisherPictureByPublisher(@RequestBody Publisher publisher) {
        return publisherPictureRepository.findPublisherPictureByPublisher(publisher);
    }

    @PostMapping("/publishers/getPublisherMangaCount")
    public Integer getPublisherMangaCount(@RequestBody Publisher publisher) {
        List<PublisherManga> publisherMangas = publisherMangaRepository.findAllByPublisher(publisher);
        return publisherMangas.size();
    }

    @PostMapping("/publishers/getAllPublisherManga/{pageNumber}")
    public List<Manga> getAllPublisherManga(@PathVariable String pageNumber, @RequestBody Publisher publisher) {
        Pageable pageable = PageRequest.of(Integer.parseInt(pageNumber), 15);
        List<PublisherManga> publisherMangas = publisherMangaRepository.findPublisherMangasByPublisher(publisher, pageable);
        List<Manga> mangas = new ArrayList<>();
        for (PublisherManga publisherManga : publisherMangas) {
            mangas.add(publisherManga.getManga());
        }
        return mangas;
    }

    @PostMapping("/publishers/addNewPublisher")
    public Publisher addNewPublisher(@RequestBody Publisher publisher) {
        return publisherRepository.save(publisher);
    }

    @PostMapping("/publishers/addPublisherPicture")
    public PublisherPicture addAuthorPicture(@RequestBody PublisherPicture publisherPicture) {
        return publisherPictureRepository.save(publisherPicture);
    }

    @GetMapping("/publishers/getAllPublishers")
    public List<Publisher> getAllPublishers() {
        return publisherRepository.findAll();
    }
}


