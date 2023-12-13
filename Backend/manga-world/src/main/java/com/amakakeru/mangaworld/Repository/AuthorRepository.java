package com.amakakeru.mangaworld.Repository;


import com.amakakeru.mangaworld.Entity.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {

    //    @Query("SELECT a FROM Author a WHERE a.aname = ?1")
    List<Author> findAllByAnameContainingIgnoreCase(String title);

    //    @Query("SELECT a FROM Author a WHERE a.adescription = ?1")
    List<Author> findAllByAdescriptionContainingIgnoreCase(String description);
}
