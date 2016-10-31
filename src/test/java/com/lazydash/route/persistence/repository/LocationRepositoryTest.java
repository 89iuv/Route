package com.lazydash.route.persistence.repository;

import com.lazydash.route.persistence.config.PersistenceConfig;
import com.lazydash.route.persistence.model.Location;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * Created by VUveges on 10/31/2016.
 */

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = PersistenceConfig.class)
public class LocationRepositoryTest {

    @Autowired
    private LocationRepository locationRepository;

    @Test
    public void testCurd(){
        Location location = new Location();
        Location save = locationRepository.save(location);

        System.out.println(save);
    }
}
