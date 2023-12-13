package com.amakakeru.mangaworld.Entity.IdClasses;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

@Data
@EqualsAndHashCode
public class CategoryMangaId implements Serializable {
    private Long cid;
    private Long mid;
}
