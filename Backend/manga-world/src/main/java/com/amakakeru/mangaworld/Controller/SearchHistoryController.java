package com.amakakeru.mangaworld.Controller;

import com.amakakeru.mangaworld.Repository.SearchHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class SearchHistoryController {

    @Autowired
    private SearchHistoryRepository searchHistoryRepository;


}
