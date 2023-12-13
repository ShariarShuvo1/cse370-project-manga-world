package com.amakakeru.mangaworld.Repository;

import com.amakakeru.mangaworld.Entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    //    select u1_0.user_id from user u1_0 where u1_0.email=email
    boolean existsByEmail(String email);

    @Query("select u from User u where u.email = ?1")
    User findUserByEmail(String email);

    //    @Query("select u from User u where u.userId = ?1")
    User findUserByUserId(Long userId);

    //    @Query("select u from User u where u.name like %?1%")
    List<User> findUsersByNameContainingIgnoreCase(String Name, Pageable pageable);
}
