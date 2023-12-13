package com.amakakeru.mangaworld.Controller;

import com.amakakeru.mangaworld.Entity.AlreadyRead;
import com.amakakeru.mangaworld.Entity.Ongoing;
import com.amakakeru.mangaworld.Entity.Wishlist;
import com.amakakeru.mangaworld.Repository.AlreadyReadRepository;
import com.amakakeru.mangaworld.Repository.OngoingRepository;
import com.amakakeru.mangaworld.Repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
public class WishlistController {

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private OngoingRepository ongoingRepository;

    @Autowired
    private AlreadyReadRepository alreadyReadRepository;

    @PostMapping("/currentStatusChecker")
    public String currentStatusChecker(@RequestBody Wishlist wishlist) {
        if (wishlistRepository.findWishlistByMangaAndUser(wishlist.getManga(), wishlist.getUser()).isPresent()) {
            return "wishlist";
        } else if (ongoingRepository.findOngoingByMangaAndUser(wishlist.getManga(), wishlist.getUser()).isPresent()) {
            return "ongoing";
        } else if (alreadyReadRepository.findAlreadyReadByMangaAndUser(wishlist.getManga(), wishlist.getUser()).isPresent()) {
            return "alreadyread";
        } else {
            return "interested";
        }
    }

    @PostMapping("/addToWishList")
    public void addToWishList(@RequestBody Wishlist wishlist) {
        if (ongoingRepository.findOngoingByMangaAndUser(wishlist.getManga(), wishlist.getUser()).isPresent()) {
            ongoingRepository.delete(ongoingRepository.findOngoingByMangaAndUser(wishlist.getManga(), wishlist.getUser()).get());
        }
        if (alreadyReadRepository.findAlreadyReadByMangaAndUser(wishlist.getManga(), wishlist.getUser()).isPresent()) {
            alreadyReadRepository.delete(alreadyReadRepository.findAlreadyReadByMangaAndUser(wishlist.getManga(), wishlist.getUser()).get());
        }
        long currentTimeMillis = System.currentTimeMillis();
        Date currentDate = new Date(currentTimeMillis);
        Timestamp currentTimestamp = new Timestamp(currentDate.getTime());
        wishlist.setAddedDate(currentTimestamp);
        wishlist.setUserId(wishlist.getUser().getUserId());
        wishlist.setMid(wishlist.getManga().getMid());
        wishlistRepository.save(wishlist);
    }

    @PostMapping("/addToOngoing")
    public void addToOngoing(@RequestBody Wishlist wishlist) {
        if (wishlistRepository.findWishlistByMangaAndUser(wishlist.getManga(), wishlist.getUser()).isPresent()) {
            wishlistRepository.delete(wishlistRepository.findWishlistByMangaAndUser(wishlist.getManga(), wishlist.getUser()).get());
        }
        if (alreadyReadRepository.findAlreadyReadByMangaAndUser(wishlist.getManga(), wishlist.getUser()).isPresent()) {
            alreadyReadRepository.delete(alreadyReadRepository.findAlreadyReadByMangaAndUser(wishlist.getManga(), wishlist.getUser()).get());
        }
        long currentTimeMillis = System.currentTimeMillis();
        Date currentDate = new Date(currentTimeMillis);
        Timestamp currentTimestamp = new Timestamp(currentDate.getTime());
        Ongoing ongoing = new Ongoing();
        ongoing.setUser(wishlist.getUser());
        ongoing.setManga(wishlist.getManga());
        ongoing.setMid(wishlist.getManga().getMid());
        ongoing.setUserId(wishlist.getUser().getUserId());
        ongoing.setAddedDate(currentTimestamp);
        ongoingRepository.save(ongoing);
    }

    @PostMapping("/addToAlreadyRead")
    public void addToAlreadyRead(@RequestBody Wishlist wishlist) {
        if (wishlistRepository.findWishlistByMangaAndUser(wishlist.getManga(), wishlist.getUser()).isPresent()) {
            wishlistRepository.delete(wishlistRepository.findWishlistByMangaAndUser(wishlist.getManga(), wishlist.getUser()).get());
        }
        if (ongoingRepository.findOngoingByMangaAndUser(wishlist.getManga(), wishlist.getUser()).isPresent()) {
            ongoingRepository.delete(ongoingRepository.findOngoingByMangaAndUser(wishlist.getManga(), wishlist.getUser()).get());
        }
        long currentTimeMillis = System.currentTimeMillis();
        Date currentDate = new Date(currentTimeMillis);
        Timestamp currentTimestamp = new Timestamp(currentDate.getTime());

        AlreadyRead alreadyRead = new AlreadyRead();
        alreadyRead.setUser(wishlist.getUser());
        alreadyRead.setManga(wishlist.getManga());
        alreadyRead.setUserId(wishlist.getUser().getUserId());
        alreadyRead.setMid(wishlist.getManga().getMid());
        alreadyRead.setAddedDate(currentTimestamp);
        alreadyReadRepository.save(alreadyRead);
    }

    @PostMapping("/removeAllInterest")
    public void removeAllInterest(@RequestBody Wishlist wishlist) {
        if (wishlistRepository.findWishlistByMangaAndUser(wishlist.getManga(), wishlist.getUser()).isPresent()) {
            wishlistRepository.delete(wishlistRepository.findWishlistByMangaAndUser(wishlist.getManga(), wishlist.getUser()).get());
        }
        if (ongoingRepository.findOngoingByMangaAndUser(wishlist.getManga(), wishlist.getUser()).isPresent()) {
            ongoingRepository.delete(ongoingRepository.findOngoingByMangaAndUser(wishlist.getManga(), wishlist.getUser()).get());
        }
        if (alreadyReadRepository.findAlreadyReadByMangaAndUser(wishlist.getManga(), wishlist.getUser()).isPresent()) {
            alreadyReadRepository.delete(alreadyReadRepository.findAlreadyReadByMangaAndUser(wishlist.getManga(), wishlist.getUser()).get());
        }
    }

    @GetMapping("/getTotalOnGoing/{userId}")
    public int getTotalOnGoing(@PathVariable String userId) {
        return ongoingRepository.countOngoingByUserId(Long.parseLong(userId));
    }

    @GetMapping("/getAllOngoing/{userId}/{pageNumber}")
    public List<Ongoing> getAllOngoing(@PathVariable String userId, @PathVariable String pageNumber) {
        Pageable pageable = PageRequest.of(Integer.parseInt(pageNumber), 20);
        return ongoingRepository.findAllByUserId(Long.parseLong(userId), pageable);
    }

    @GetMapping("getTotalAlreadyRead/{userId}")
    public int getTotalAlreadyRead(@PathVariable String userId) {
        return alreadyReadRepository.countAlreadyReadByUserId(Long.parseLong(userId));
    }

    @GetMapping("/getAllAlreadyRead/{userId}/{pageNumber}")
    public List<AlreadyRead> getAllAlreadyRead(@PathVariable String userId, @PathVariable String pageNumber) {
        Pageable pageable = PageRequest.of(Integer.parseInt(pageNumber), 20);
        return alreadyReadRepository.findAllByUserId(Long.parseLong(userId), pageable);
    }

    @GetMapping("/getTotalWishlist/{userId}")
    public int getTotalWishlist(@PathVariable String userId) {
        return wishlistRepository.countWishlistByUserId(Long.parseLong(userId));
    }

    @GetMapping("/getAllWishlist/{userId}/{pageNumber}")
    public List<Wishlist> getAllWishlist(@PathVariable String userId, @PathVariable String pageNumber) {
        Pageable pageable = PageRequest.of(Integer.parseInt(pageNumber), 20);
        return wishlistRepository.findAllByUserId(Long.parseLong(userId), pageable);
    }

    @PostMapping("/deleteOngoing")
    public void deleteOngoing(@RequestBody Ongoing ongoing) {
        ongoingRepository.delete(ongoing);
    }

    @PostMapping("/deleteAlreadyRead")
    public void deleteAlreadyRead(@RequestBody AlreadyRead alreadyRead) {
        alreadyReadRepository.delete(alreadyRead);
    }

    @PostMapping("/deleteWishlist")
    public void deleteAlreadyRead(@RequestBody Wishlist wishlist) {
        wishlistRepository.delete(wishlist);
    }
}
