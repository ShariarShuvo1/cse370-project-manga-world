package com.amakakeru.mangaworld.Repository;

import com.amakakeru.mangaworld.Entity.ProfilePicture;
import com.amakakeru.mangaworld.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfilePictureRepository extends JpaRepository<ProfilePicture, Long> {

    //    @Query("SELECT p FROM ProfilePicture p WHERE p.user.id = ?1")
    ProfilePicture findProfilePictureByUser(User user);
}
