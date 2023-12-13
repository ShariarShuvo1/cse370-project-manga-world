package com.amakakeru.mangaworld.Controller;

import com.amakakeru.mangaworld.Entity.ProfilePicture;
import com.amakakeru.mangaworld.Entity.User;
import com.amakakeru.mangaworld.Repository.ProfilePictureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://localhost:3000")
@RestController
public class ProfilePictureController {

    @Autowired
    private ProfilePictureRepository profilePictureRepository;

    @PostMapping("/getUserProfilePicture")
    public ProfilePicture getUserProfilePicture(@RequestBody User user) {
        return profilePictureRepository.findProfilePictureByUser(user);
    }

    @PostMapping("updateProfilePicture")
    public ProfilePicture updateProfilePicture(@RequestBody ProfilePicture profilePicture) {
        return profilePictureRepository.save(profilePicture);
    }
}
