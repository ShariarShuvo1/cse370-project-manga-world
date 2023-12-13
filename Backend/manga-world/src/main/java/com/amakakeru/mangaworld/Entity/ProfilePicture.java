package com.amakakeru.mangaworld.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "profile_picture")
public class ProfilePicture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "picture_id")
    private Long pictureId;

    @Column(name = "picture", nullable = false)
    private String picture;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;
}
