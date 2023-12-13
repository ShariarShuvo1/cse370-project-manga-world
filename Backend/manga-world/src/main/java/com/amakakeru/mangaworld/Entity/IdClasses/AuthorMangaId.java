package com.amakakeru.mangaworld.Entity.IdClasses;


import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

@EqualsAndHashCode
@Data
public class AuthorMangaId implements Serializable {
    private Long aid;
    private Long mid;
}
