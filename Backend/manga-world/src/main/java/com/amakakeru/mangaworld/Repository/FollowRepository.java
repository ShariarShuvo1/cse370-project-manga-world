package com.amakakeru.mangaworld.Repository;

import com.amakakeru.mangaworld.Entity.Author;
import com.amakakeru.mangaworld.Entity.Follow;
import com.amakakeru.mangaworld.Entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {

    //    @Query("SELECT f FROM Follow f WHERE f.author = ?1 AND f.user = ?2")
    Optional<Follow> findFollowByAuthorAndUser(Author author, User user);

    //    @Query("SELECT f FROM Follow f WHERE f.author = ?1")
    List<Follow> findAllByAuthor(Author author);

    //    @Query("SELECT f FROM Follow f WHERE f.user = ?1")
    List<Follow> findAllByUserId(Long userId, Pageable pageable);

    //    @Query("SELECT COUNT(f) FROM Follow f WHERE f.user = ?1")
    Integer countFollowsByUserId(Long userId);

}
