package com.amakakeru.mangaworld.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "manga_file")
public class MangaFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mf_id")
    private Long mfId;

    @Column(name = "mf_file", nullable = false)
    private String mfFile;

    @OneToOne
    @JoinColumn(name = "c_id", nullable = false)
    private Chapter chapter;
}
