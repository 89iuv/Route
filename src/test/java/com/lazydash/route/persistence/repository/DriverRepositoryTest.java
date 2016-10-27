package com.lazydash.route.persistence.repository;

import com.lazydash.route.persistence.config.PersistenceConfig;
import com.lazydash.route.persistence.model.Driver;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.*;

/**
 * Created by VUveges on 10/27/2016.
 */

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = PersistenceConfig.class)
public class DriverRepositoryTest {

    @Autowired
    DriverRepository driverRepository;

    @Test
    public void testJpa(){
        Driver driver = new Driver();
        driver.setName("Gigiel Gheorghe");
        driver.setCar("B 01 GGG");

        Driver save = driverRepository.save(driver);
        Driver one = driverRepository.findOne(save.getId());

        Assert.assertEquals(driver.getName(), one.getName());
        Assert.assertEquals(driver.getCar(), one.getCar());

    }

}