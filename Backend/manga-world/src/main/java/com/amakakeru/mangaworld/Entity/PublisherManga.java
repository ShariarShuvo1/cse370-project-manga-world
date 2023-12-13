package com.amakakeru.mangaworld.Entity;

import com.amakakeru.mangaworld.Entity.IdClasses.PublisherMangaId;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Objects;

@Data
@Entity
@IdClass(PublisherMangaId.class)
@Table(name = "publisher_manga")
public class PublisherManga {

    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "p_id")
    private Long pid;

    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "m_id")
    private Long mid;

    @ManyToOne
    @JoinColumn(name = "p_id", insertable = false, updatable = false)
    private Publisher publisher;

    @ManyToOne
    @JoinColumn(name = "m_id", insertable = false, updatable = false)
    private Manga manga;

    @Override
    public int hashCode() {
        return Objects.hash(pid, mid);
    }

    @Override
    public String toString() {
        return "PublisherManga{" +
                "pid=" + pid +
                ", mid=" + mid +
                '}';
    }
}
