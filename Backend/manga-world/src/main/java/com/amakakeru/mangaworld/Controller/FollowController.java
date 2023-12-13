package com.amakakeru.mangaworld.Controller;

import com.amakakeru.mangaworld.Entity.Author;
import com.amakakeru.mangaworld.Entity.Follow;
import com.amakakeru.mangaworld.Repository.FollowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("http://localhost:3000")
@RestController
public class FollowController {

    @Autowired
    private FollowRepository followRepository;

    @PostMapping("/followCheck")
    public ResponseEntity<?> followCheck(@RequestBody Follow follow) {

        Optional<Follow> followOptional = followRepository.findFollowByAuthorAndUser(follow.getAuthor(), follow.getUser());
        if (followOptional.isPresent()) {
            return ResponseEntity.ok().body(followOptional.get());
        } else return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Not Following");
    }

    @PostMapping("/follow")
    public Follow follow(@RequestBody Follow follow1) {
        follow1.setAid(follow1.getAuthor().getAid());
        follow1.setUserId(follow1.getUser().getUserId());
        return followRepository.save(follow1);
    }

    @PostMapping("/unfollow")
    public void unfollow(@RequestBody Follow follow1) {
        follow1.setAid(follow1.getAuthor().getAid());
        follow1.setUserId(follow1.getUser().getUserId());
        followRepository.delete(follow1);
    }

    @PostMapping("/getTotalFollower")
    public Integer getTotalFollower(@RequestBody Author author) {
        return followRepository.findAllByAuthor(author).size();
    }

    @GetMapping("/getAllFollowing/{userId}/{pageNumber}")
    public List<Follow> getAllFollowing(@PathVariable String userId, @PathVariable String pageNumber) {
        Pageable pageable = PageRequest.of(Integer.parseInt(pageNumber), 20);
        return followRepository.findAllByUserId(Long.parseLong(userId), pageable);
    }

    @GetMapping("/getTotalFollowing/{userId}")
    public Integer getTotalFollowing(@PathVariable String userId) {
        return followRepository.countFollowsByUserId(Long.parseLong(userId));
    }
}
