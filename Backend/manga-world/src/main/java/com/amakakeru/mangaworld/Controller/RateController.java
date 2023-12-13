package com.amakakeru.mangaworld.Controller;

import com.amakakeru.mangaworld.Entity.Manga;
import com.amakakeru.mangaworld.Entity.Rate;
import com.amakakeru.mangaworld.Entity.User;
import com.amakakeru.mangaworld.Repository.RateRepository;
import com.amakakeru.mangaworld.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class RateController {

    @Autowired
    private RateRepository rateRepository;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/rates/getAllRating/{pageNumber}")
    private List<Rate> getAllRating(@PathVariable String pageNumber, @RequestBody Manga manga) {
        Pageable pageable = PageRequest.of(Integer.parseInt(pageNumber), 10);
        return rateRepository.findAllByMangaOrderByRdateDesc(manga, pageable);
    }

    @PostMapping("/rates/findRateByUser/{userId}")
    private boolean findRateByUser(@PathVariable String userId, @RequestBody Manga manga) {
        Optional<User> user = userRepository.findById(Long.parseLong(userId));
        if (user.isPresent()) {
            Optional<Rate> rate = rateRepository.findRateByMangaAndUser(manga, user.get());
            return rate.isPresent();
        } else {
            return false;
        }
    }

    @PostMapping("/rates/addNewRate")
    private void addNewRate(@RequestBody Rate rate) {
        long currentTimeMillis = System.currentTimeMillis();
        Date currentDate = new Date(currentTimeMillis);
        Timestamp currentTimestamp = new Timestamp(currentDate.getTime());
        rate.setRdate(currentTimestamp);
        rateRepository.save(rate);
    }
}
