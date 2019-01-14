DROP DATABASE IF EXISTS arenadata;
CREATE DATABASE arenadata;

USE arenadata;


CREATE TABLE matches (
id integer(11) NOT NULL AUTO_INCREMENT,
timestamp integer(30) NOT NULL,
playersnumber integer(2) NOT NULL,
teamcomposition varchar(256) NOT NULL,
enemycomposition varchar(256) NOT NULL,
duration integer(4) NOT NULL,
victory boolean NOT NULL,
killingblows integer(3),
damage integer(11),
healing integer(11),
honor integer(11),
ratingchange integer(4),
mmr integer(5),
enemymmr integer(5),
specialization varchar(36),
israted boolean,
PRIMARY KEY (`id`)
);

-- Insert dummy department
Insert Into matches (
					timestamp, 
					playersnumber, 
					teamcomposition, 
                    enemycomposition, duration, 
                    duration, victory, 
                    killingblows, 
                    damage, 
                    healing, 
                    honor, 
                    ratingchange,
                    mmr,
                    enemymmr,
                    specialization,
                    israted)
Values (1547221143,572,6,"MAGE-Frost,PRIEST-Discipline,ROGUE-Assassination","PALADIN-Holy,SHAMAN-Elemental, WARLOCK-Destruction",337,false,0,588988,210871,0,-8,2365,2406,"Frost",true), 
(1547220783,1134,6,"MAGE-Frost,PRIEST-Discipline,ROGUE-Assassination","DEATHKNIGHT-Unholy,MONK-Mistweaver,PALADIN-Protection",253,true,2,637324,43925,0,13,2344,2301,"Frost",true),
(1547220265,1134,6,"MAGE-Frost,PRIEST-Discipline,ROGUE-Assassination","DEATHKNIGHT-Unholy,PALADIN-Holy,SHAMAN-Elemental",225,true,0,540753,183417,0,10,2333,2217,"Frost",true),
(1547219690,1825,6,"MAGE-Frost,PRIEST-Discipline,ROGUE-Assassination","DEATHKNIGHT-Unholy,MONK-Mistweaver,PALADIN-Protection",197,true,2,785612,83026,0,15,2294,2340,"Frost",true),
(1547219347,980,6,"MAGE-Frost,PRIEST-Discipline,ROGUE-Assassination","DEATHKNIGHT-Unholy,PALADIN-Holy,SHAMAN-Elemental",201,true,1,574144,92786,0,12,2270,2243,"Frost",true);

SELECT * FROM products;