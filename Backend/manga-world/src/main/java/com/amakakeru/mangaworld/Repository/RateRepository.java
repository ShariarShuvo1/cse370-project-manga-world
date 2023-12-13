package com.amakakeru.mangaworld.Repository;

import com.amakakeru.mangaworld.Entity.Manga;
import com.amakakeru.mangaworld.Entity.Rate;
import com.amakakeru.mangaworld.Entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface RateRepository extends JpaRepository<Rate, Long> {

    //    @Query("SELECT r FROM Rate r WHERE r.manga = ?1")
    List<Rate> findAllByManga(Manga manga);

    //    @Query("SELECT r FROM Rate r WHERE r.manga = ?1 ORDER BY r.rdate DESC")
    List<Rate> findAllByMangaOrderByRdateDesc(Manga manga, Pageable pageable);

    //    @Query("SELECT r FROM Rate r WHERE r.user = ?1 ORDER BY r.rdate DESC")
    Optional<Rate> findRateByMangaAndUser(Manga manga, User user);
}
