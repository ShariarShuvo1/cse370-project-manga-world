package com.amakakeru.mangaworld.Repository;

import com.amakakeru.mangaworld.Entity.AlreadyRead;
import com.amakakeru.mangaworld.Entity.Manga;
import com.amakakeru.mangaworld.Entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AlreadyReadRepository extends JpaRepository<AlreadyRead, Long> {

    //@Query("SELECT a FROM AlreadyRead a WHERE a.manga = ?1 AND a.user = ?2")
    Optional<AlreadyRead> findAlreadyReadByMangaAndUser(Manga manga, User user);

    //@Query("SELECT a FROM AlreadyRead a WHERE a.user.id = ?1")
    List<AlreadyRead> findAllByUserId(Long userId, Pageable pageable);

    //    @Query("SELECT COUNT(a) FROM AlreadyRead a WHERE a.user.id = ?1")
    Integer countAlreadyReadByUserId(Long userId);

}
