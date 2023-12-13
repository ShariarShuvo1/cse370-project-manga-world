package com.amakakeru.mangaworld.Repository;

import com.amakakeru.mangaworld.Entity.Manga;
import com.amakakeru.mangaworld.Entity.User;
import com.amakakeru.mangaworld.Entity.Wishlist;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {

    //    @Query("select w from Wishlist w where w.user = ?1")
    Optional<Wishlist> findWishlistByMangaAndUser(Manga manga, User user);

    //    @Query("select w from Wishlist w where w.user.userId = ?1")
    List<Wishlist> findAllByUserId(Long userId, Pageable pageable);

    //    @Query("select count(w) from Wishlist w where w.user.userId = ?1")
    Integer countWishlistByUserId(Long userId);
}
