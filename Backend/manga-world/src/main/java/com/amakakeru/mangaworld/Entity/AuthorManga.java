package com.amakakeru.mangaworld.Entity;

import com.amakakeru.mangaworld.Entity.IdClasses.AuthorMangaId;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Objects;

@Data
@Entity
@IdClass(AuthorMangaId.class)
@Table(name = "author_manga")
public class AuthorManga {

    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "a_id")
    private Long aid;

    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "m_id")
    private Long mid;

    @ManyToOne
    @JoinColumn(name = "a_id", insertable = false, updatable = false)
    private Author author;

    @ManyToOne
    @JoinColumn(name = "m_id", insertable = false, updatable = false)
    private Manga manga;

    @Override
    public int hashCode() {
        return Objects.hash(aid, mid);
    }

    @Override
    public String toString() {
        return "AuthorManga{" +
                "aid=" + aid +
                ", mid=" + mid +
                '}';
    }
}
