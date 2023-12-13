package com.amakakeru.mangaworld.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "chapter_cover")
public class ChapterCover {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cc_id")
    private Long ccId;

    @Column(name = "cc_picture", nullable = false)
    private String ccPicture;

    @OneToOne
    @JoinColumn(name = "c_id", nullable = false, unique = true)
    private Chapter chapter;
}
