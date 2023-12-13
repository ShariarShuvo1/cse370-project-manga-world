package com.amakakeru.mangaworld.Repository;

import com.amakakeru.mangaworld.Entity.Author;
import com.amakakeru.mangaworld.Entity.AuthorManga;
import com.amakakeru.mangaworld.Entity.Manga;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuthorMangaRepository extends JpaRepository<AuthorManga, Long> {

    //    @Query("SELECT a FROM AuthorManga a WHERE a.manga = ?1 AND a.author = ?2")
    List<AuthorManga> findAllByManga(Manga manga);

    //    @Query("SELECT a FROM AuthorManga a WHERE a.manga = ?1 AND a.author = ?2")
    List<AuthorManga> findAllByAuthor(Author author);

    //    @Query("SELECT a FROM AuthorManga a WHERE a.manga = ?1 AND a.author = ?2")
    List<AuthorManga> findAuthorMangasByAuthor(Author author, Pageable pageable);
}
