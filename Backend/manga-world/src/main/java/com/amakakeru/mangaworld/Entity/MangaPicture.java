package com.amakakeru.mangaworld.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Objects;

@Data
@Entity
@Table(name = "manga_picture")
public class MangaPicture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mp_id")
    private Long mpId;

    @Column(name = "mp_picture", nullable = false)
    private String mpPicture;

    @OneToOne
    @JoinColumn(name = "m_id", nullable = false, unique = true)
    private Manga manga;

    @Override
    public int hashCode() {
        return Objects.hash(mpId, mpPicture);
    }

    @Override
    public String toString() {
        return "MangaPicture{" +
                "mpId=" + mpId +
                ", mpPicture='" + mpPicture + '\'' +
                '}';
    }
}
