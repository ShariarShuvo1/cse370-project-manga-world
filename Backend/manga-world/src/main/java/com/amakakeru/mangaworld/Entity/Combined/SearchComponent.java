package com.amakakeru.mangaworld.Entity.Combined;

import com.amakakeru.mangaworld.Entity.Author;
import com.amakakeru.mangaworld.Entity.Manga;
import com.amakakeru.mangaworld.Entity.Publisher;
import lombok.Data;

import java.util.List;

@Data
public class SearchComponent {
    List<Manga> mangas;
    List<Author> authors;
    List<Publisher> publishers;
}
