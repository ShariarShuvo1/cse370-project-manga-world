package com.amakakeru.mangaworld.Repository;

import com.amakakeru.mangaworld.Entity.Author;
import com.amakakeru.mangaworld.Entity.AuthorPicture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:3000")
@Repository
public interface AuthorPictureRepository extends JpaRepository<AuthorPicture, Long> {

    //    @Query("SELECT ap FROM AuthorPicture ap WHERE ap.author = ?1")
    AuthorPicture findAuthorPictureByAuthor(Author author);
}
