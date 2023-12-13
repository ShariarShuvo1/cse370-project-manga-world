package com.amakakeru.mangaworld.Controller;

import com.amakakeru.mangaworld.Entity.Authorities;
import com.amakakeru.mangaworld.Entity.User;
import com.amakakeru.mangaworld.Repository.AuthoritiesRepository;
import com.amakakeru.mangaworld.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AuthoritiesController {

    @Autowired
    private AuthoritiesRepository authoritiesRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/getAuthByUserId/{userId}")
    public ResponseEntity<?> getAuthById(@PathVariable String userId){

//        select u1_0.user_id,u1_0.email,u1_0.name,u1_0.password, user u1_0 where u1_0.user_id= userId
        Optional<User> user = userRepository.findById(Long.parseLong(userId));
        if(user.isPresent()){
            List<Authorities> authorities = authoritiesRepository.findAllByUser(user.get());
            for(Authorities authorities1: authorities){
                if (authorities1.getType().equals("admin")){
                    return ResponseEntity.status(HttpStatus.ACCEPTED).body(authorities1);
                }
            }
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(authorities.get(0));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User Not Found");
    }
}
