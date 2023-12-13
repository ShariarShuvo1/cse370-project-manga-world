package com.amakakeru.mangaworld.Repository;

import com.amakakeru.mangaworld.Entity.Publisher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PublisherRepository extends JpaRepository<Publisher, Long> {

    //    @Query("SELECT p FROM Publisher p WHERE p.pname = ?1")
    List<Publisher> findAllByPnameContainingIgnoreCase(String name);

    //    @Query("SELECT p FROM Publisher p WHERE p.pdescription = ?1")
    List<Publisher> findAllByPdescriptionContainingIgnoreCase(String description);
}
