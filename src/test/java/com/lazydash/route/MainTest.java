package com.lazydash.route;

import org.junit.Test;

/**
 * Created by VUveges on 10/22/2016.
 */
public class MainTest {

    @Test
    public void testMain() throws Exception {
        ClassOne classOne = new ClassOne();
        ClassTwo classTwo = new ClassTwo();

        classTwo.callMethodFromClassOne(classOne);

    }

    class ClassOne{

        public void print(){
            System.out.println("test");
        }
    }

    class ClassTwo{

        public void callMethodFromClassOne(ClassOne classOne){
            classOne.print();
        }

    }
}
