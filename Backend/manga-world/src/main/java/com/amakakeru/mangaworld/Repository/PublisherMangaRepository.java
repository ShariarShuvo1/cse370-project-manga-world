package com.amakakeru.mangaworld.Repository;

import com.amakakeru.mangaworld.Entity.Manga;
import com.amakakeru.mangaworld.Entity.Publisher;
import com.amakakeru.mangaworld.Entity.PublisherManga;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PublisherMangaRepository extends JpaRepository<PublisherManga, Long> {

    //    @Query("SELECT p FROM PublisherManga p WHERE p.manga.id = ?1 AND p.publisher.id = ?2")
    PublisherManga findAllByManga(Manga manga);

    //    @Query("SELECT p FROM PublisherManga p WHERE p.publisher.id = ?1")
    List<PublisherManga> findAllByPublisher(Publisher publisher);

    //    @Query("SELECT p FROM PublisherManga p WHERE p.publisher.id = ?1")
    List<PublisherManga> findPublisherMangasByPublisher(Publisher publisher, Pageable pageable);
}
