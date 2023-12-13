package com.amakakeru.mangaworld.Repository;

import com.amakakeru.mangaworld.Entity.Manga;
import com.amakakeru.mangaworld.Entity.Ongoing;
import com.amakakeru.mangaworld.Entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OngoingRepository extends JpaRepository<Ongoing, Long> {

    //    @Query("SELECT o FROM Ongoing o WHERE o.user.id = ?1 AND o.manga.id = ?2")
    Optional<Ongoing> findOngoingByMangaAndUser(Manga manga, User user);

    //    @Query("SELECT o FROM Ongoing o WHERE o.user.id = ?1")
    List<Ongoing> findAllByUserId(Long userId, Pageable pageable);

    //    @Query("SELECT COUNT(o) FROM Ongoing o WHERE o.user.id = ?1")
    Integer countOngoingByUserId(Long userId);
}
