package com.amakakeru.mangaworld.Repository;

import com.amakakeru.mangaworld.Entity.Publisher;
import com.amakakeru.mangaworld.Entity.PublisherPicture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PublisherPictureRepository extends JpaRepository<PublisherPicture, Long> {

    //    @Query("SELECT p FROM PublisherPicture p WHERE p.publisher = ?1")
    PublisherPicture findPublisherPictureByPublisher(Publisher publisher);
}
