package com.amakakeru.mangaworld.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Objects;

@Data
@Entity
@Table(name = "publisher_picture")
public class PublisherPicture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pp_id")
    private Long ppId;

    @Column(name = "pp_picture", nullable = false)
    private String ppPicture;

    @OneToOne
    @JoinColumn(name = "p_id", nullable = false, unique = true)
    private Publisher publisher;

    @Override
    public int hashCode() {
        return Objects.hash(ppId, ppPicture);
    }

    @Override
    public String toString() {
        return "PublisherPicture{" +
                "ppId=" + ppId +
                ", ppPicture='" + ppPicture + '\'' +
                '}';
    }
}
