package com.amakakeru.mangaworld.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "volume")
public class Volume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "v_id")
    private Long vid;

    @Column(name = "v_number", nullable = false, columnDefinition = "int default 0")
    private int vnumber;

    @Column(name = "v_title", nullable = false)
    private String vtitle;

    @Column(name = "v_release_date", nullable = false)
    private java.sql.Date vreleaseDate;

    @Column(name = "v_view", nullable = false, columnDefinition = "int default 0")
    private int vview;

    @ManyToOne
    @JoinColumn(name = "m_id", nullable = false)
    private Manga manga;

    @JsonIgnore
    @OneToMany(mappedBy = "volume", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Chapter> chapters;

    @JsonIgnore
    @OneToOne(mappedBy = "volume", cascade = CascadeType.ALL, orphanRemoval = true)
    private VolumeCover volumeCover;
}
