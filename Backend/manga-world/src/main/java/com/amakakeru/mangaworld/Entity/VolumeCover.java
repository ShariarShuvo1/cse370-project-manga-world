package com.amakakeru.mangaworld.Entity;

import jakarta.persistence.*;
import lombok.Data;


@Data
@Entity
@Table(name = "volume_cover")
public class VolumeCover {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vc_id")
    private Long vcId;

    @Column(name = "vc_picture", nullable = false)
    private String vcPicture;

    @OneToOne
    @JoinColumn(name = "v_id", nullable = false, unique = true)
    private Volume volume;
}
