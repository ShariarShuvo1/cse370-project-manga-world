package com.amakakeru.mangaworld.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Objects;

@Data
@Entity
@Table(name = "author_picture")
public class AuthorPicture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ap_id")
    private Long apId;

    @Column(name = "ap_picture", nullable = false)
    private String apPicture;

    @OneToOne
    @JoinColumn(name = "a_id", nullable = false, unique = true)
    private Author author;

    @Override
    public int hashCode() {
        return Objects.hash(apId, apPicture);
    }

    @Override
    public String toString() {
        return "AuthorPicture{" +
                "apId=" + apId +
                ", apPicture='" + apPicture + '\'' +
                '}';
    }
}
